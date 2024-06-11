import { RequestHandler } from "express";
import createHttpError from "http-errors";
import PremiumTierModel from "../models/premium_tier";

export const getPrice: RequestHandler = async (req, res, next) => {
  try {
    const tier = await PremiumTierModel.findOne();

    if (!tier) {
      throw createHttpError(401, "Tier not found");
    }

    const price = tier.price;

    res.status(200).json(price);
  } catch (error) {
    next(error);
  }
};

export const getUserCount: RequestHandler = async (req, res, next) => {
  try {
    const tier = await PremiumTierModel.findOne();

    if (!tier) {
      throw createHttpError(401, "Tier not found");
    }

    const users = tier.users.length;

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

interface UpdatePriceProps {
  newPrice: number;
}

export const updatePrice: RequestHandler<
  unknown,
  unknown,
  UpdatePriceProps,
  unknown
> = async (req, res, next) => {
  const newPrice = req.body.newPrice;
  try {
    if (!newPrice) {
      throw createHttpError(401, "Premium Tier needs a price");
    }
    const tier = await PremiumTierModel.findOne();

    if (!tier) {
      throw createHttpError(401, "Tier not found");
    }

    tier.price = newPrice;

    await tier.save();
    res.status(200).json(tier);
  } catch (error) {
    next(error);
  }
};
