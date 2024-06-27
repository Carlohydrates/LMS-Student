import { RequestHandler } from "express";
import createHttpError from "http-errors";
import TierModel from "../models/tier";

// For creation of new tiers via Postman

// export const createNewTier: RequestHandler = async (req, res, next) => {
//   try {
//     const newTier = await TierModel.create({
//       tier: 2,
//       price: 20,
//     });

//     res.status(200).json(newTier);
//   } catch (error) {
//     next(error);
//   }
// };

interface PriceProps {
  tier: number;
}

export const getPrice: RequestHandler<
  unknown,
  unknown,
  unknown,
  PriceProps
> = async (req, res, next) => {
  const target = req.query.tier;
  try {
    const tier = await TierModel.findOne({ tier: target });

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
    const tier = await TierModel.findOne();

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
  tier: number;
  newPrice: number;
}

export const updatePrice: RequestHandler<
  unknown,
  unknown,
  UpdatePriceProps,
  PriceProps
> = async (req, res, next) => {
  const target = req.query.tier;
  const newPrice = req.body.newPrice;
  try {
    // if (tier) {
    //   throw createHttpError(401, "Premium Tier needs a price");
    // }
    if (!newPrice) {
      throw createHttpError(401, "Premium Tier needs a price");
    }
    const tier = await TierModel.findOne({ tier: target });

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
