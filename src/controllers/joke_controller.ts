import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Joke from "../models/joke";
import Category from "../models/category";

export const createJoke = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, imageUrl, categories } = req.body;
    if (!title || !content) {
      res.status(422).json({ error: "Missing title or content" });
      return;
    }
    if (!Array.isArray(categories)) {
      res.status(422).json({ error: "Categories must be an array" });
      return;
    }

    const categoryIds: mongoose.Schema.Types.ObjectId[] = [];
    for (const categoryName of categories) {
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        res.status(400).json({error:`Category '${categoryName}' does not exist`});
        return;
      }
      categoryIds.push(category._id as mongoose.Schema.Types.ObjectId);
    }

    const createJoke = await Joke.create({
      title: title,
      content: content,
      imageUrl: imageUrl,
      author: req.user.userId,
      categories: categoryIds,
    });

    res.status(201).json({
      message: "Joke created successfully",
      joke: createJoke,
    });
  } catch (error: any) {
    console.log(error.toString());
    next(error);
  }
};

export const getJokes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jokes = await Joke.find().populate("author", "user_name").populate("categories", "name");
    res.status(200).json(jokes);
  } catch (error: any) {
    console.log(error.toString());
    next(error);
  }
};

export const getJokeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const joke = await Joke.findById(req.params.id).populate("author", "user_name").populate("categories", "name");
    if (!joke) {
      res.status(404).json({ error: "Joke not found" });
      return;
    }
    res.status(200).json(joke);
  } catch (error: any) {
    console.log(error.toString());
    next(error);
  }
};

export const updateJoke = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, imageUrl, categories } = req.body;
    const joke = await Joke.findById(req.params.id);
    if (!joke) {
      res.status(404).json({ error: "Joke not found" });
      return;
    }
    if (joke.author.toString() !== req.user.userId) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const categoryIds: mongoose.Schema.Types.ObjectId[] = [];
    for (const categoryName of categories) {
      const category = await Category.findOne({ name: categoryName }) ;
      if (!category) {
        res.status(400).json({error:`Category '${categoryName}' does not exist`});
        return;
      }
      categoryIds.push(category._id as mongoose.Schema.Types.ObjectId);
    }

    joke.title = title || joke.title;
    joke.content = content || joke.content;
    joke.imageURL = imageUrl || joke.imageURL;
    joke.categories = categoryIds || joke.categories; // Update categories field
    await joke.save();
    res.status(200).json({ message: "Joke updated successfully", joke });
  } catch (error: any) {
    console.log(error.toString());
    res.status(400).json({ error: error.message });
    next(error);
  }
};

export const deleteJoke = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const joke = await Joke.findById(req.params.id);
    if (!joke) {
      res.status(404).json({ error: "Joke not found" });
      return;
    }
    if (joke.author.toString() !== req.user.userId) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }
    await joke.deleteOne();
    res.status(200).json({ message: "Joke deleted successfully" });
  } catch (error: any) {
    console.log(error.toString());
    next(error);
  }
};