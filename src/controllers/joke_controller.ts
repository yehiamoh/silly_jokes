import { Request, Response, NextFunction } from "express";
import Joke from "../models/joke";

export const createJoke = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, imageUrl } = req.body;
    if (!title || !content) {
      res.status(422).json({ error: "Missing title or content" });
      return;
    }
    const createJoke = await Joke.create({
      title: title,
      content: content,
      imageUrl: imageUrl,
      author: req.user.userId, // Add author field
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
    const jokes = await Joke.find().populate("author", "user_name");
    res.status(200).json(jokes);
  } catch (error: any) {
    console.log(error.toString());
    next(error);
  }
};

export const getJokeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const joke = await Joke.findById(req.params.id).populate("author", "user_name");
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
    const { title, content, imageUrl } = req.body;
    const joke = await Joke.findById(req.params.id);
    if (!joke) {
      res.status(404).json({ error: "Joke not found" });
      return;
    }
    if (joke.author.toString() !== req.user.userId) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }
    joke.title = title || joke.title;
    joke.content = content || joke.content;
    joke.imageURL = imageUrl || joke.imageURL;
    await joke.save();
    res.status(200).json({ message: "Joke updated successfully", joke });
  } catch (error: any) {
    console.log(error.toString());
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