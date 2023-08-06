export type Items = {
    Item: Item;
    BasePrice: number;
    CurrencyID: string;
    DiscountPercent: number;
    DiscountedPrice: number;
    IsPromoItem: boolean;
};

export type Item = {
    ItemTypeID: string;
    ItemID: string;
    Quantity: number;
}

export type SkinLevels = {
    uuid: string,
    displayName: string,
    displayIcon: string,
}

export type PlayerCardResponse = {
    status: number,
    data: PlayerCard,
}

export type PlayerCard = {
    uuid: string,
    displayName: string,
    isHiddenIfNotOwned: boolean,
    themeUuid: string,
    displayIcon: string,
    smallArt: string,
    wideArt: string,
    largeArt: string,
    assetPath: string,
}

export type Bundle = {
    ID: string;
    DataAssetID: string;
    CurrencyID: string;
    Items: Items[];
}

export type BundleInfos = {
    uuid: string,
    displayName: string,
    displayNameSubText: string,
    description: string,
    extraDescription: string,
    promoDescription: string,
    useAdditionalContent: boolean,
    displayIcon: string,
    displayIcon2: string,
    verticalPromoImage: string,
    assetPath: string,
}

export type StorefrontResponse = {
    FeaturedBundle: {
        Bundle: Bundle
        Bundles: Bundle[];
        BundleRemainingDurationInSeconds: number;
    };
    SkinsPanelLayout: {
        SingleItemOffers: string[];
        SingleItemStoreOffers: {
            OfferID: string;
            IsDirectPurchase: boolean;
            StartDate: string;
            Cost: {
                [x: string]: number;
            };
            Rewards: {
                ItemTypeID: string;
                ItemID: string;
                Quantity: number;
            }[];
        }[];
        SingleItemOffersRemainingDurationInSeconds: number;
    };
    UpgradeCurrencyStore: {
        UpgradeCurrencyOffers: {
            OfferID: string;
            StorefrontItemID: string;
            Offer: {
                OfferID: string;
                IsDirectPurchase: boolean;
                StartDate: string;
                Cost: {
                    [x: string]: number;
                };
                Rewards: {
                    ItemTypeID: string;
                    ItemID: string;
                    Quantity: number;
                }[];
            };
        }[];
    };
    BonusStore?: {
        BonusStoreOffers: {
            BonusOfferID: string;
            Offer: {
                OfferID: string;
                IsDirectPurchase: boolean;
                StartDate: string;
                Cost: {
                    [x: string]: number;
                };
                Rewards: {
                    ItemTypeID: string;
                    ItemID: string;
                    Quantity: number;
                }[];
            };
            DiscountPercent: number;
            DiscountCosts: {
                [x: string]: number;
            };
            IsSeen: boolean;
        };
    } | undefined;
}


export interface SvgProps {
    color: string;
    width?: number;
    height?: number;
}