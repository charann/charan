/*
  Expects to be called: ProductService

*/

module.exports = [
    // TODO: Needs cookie service to get store ID
    // TODO: Get Token, pass with service.
    '$http',
    function($http) {

        var product = {};

        product.switch = function(productName) {
            product.data = {
                name: productName,
                skuRefinements: skuRefinements,
                details: details,
                pricing: pricing
            };
        };

        product.get = function(type, value) {
            return parseReturns({
                getSkuDetails: skuDetails,
                getSkuAdditionalContent: skuAdditionalContent,
                getSkuPricePromotions: skuPricePromotions
            });
        }

        product.getBySku = function(sku) {

        }

        product.getByProdId = function(prodId) {

        }

        var parseReturns = function(returnsObj) {
            var parsedReturn = {
                media: {},
                skuRefinements: {},
                thirdParty: {},
                pricing: {}
            };

            /*
                getSkuDetails
            */

            // Product Overview, various details
            parsedReturn.details = returnsObj.getSkuDetails.detail;
            parsedReturn.details.breadcrumbs = returnsObj.getSkuDetails.breadCrumb;

            // CVS Brand
            parsedReturn.cvsBrand = returnsObj.getSkuDetails.alternateProduct;

            // Contains array of hero and thumb images
            parsedReturn.media.gallery = returnsObj.getSkuDetails.auxiliaryMedia;

            // Valid SKUs are the skus which are Valid
            // considering current sku choice
            parsedReturn.skuRefinements.validSkus = returnsObj.getSkuDetails.validSkus;

            // Sku Groups are refinement Types
            // The availability of these items
            // can be narrowed down with valid skus
            parsedReturn.skuRefinements.skuGroups = returnsObj.getSkuDetails.skuGroupInfo;

            /*
                getSkuPricePromotions
            */

            // Pricing
            parsedReturn.pricing.details = returnsObj.getSkuPricePromotions.priceInfo;

            // Promos (SPIN Style)
            parsedReturn.pricing.promoDetails = returnsObj.getSkuPricePromotions.spinPricing;

            // Status / Availability
            parsedReturn.availability = returnsObj.getSkuPricePromotions.statusInfo;

            // Third Party info (Ordergroove, etc)
            parsedReturn.thirdParty.orderGroove = returnsObj.getSkuPricePromotions.ogProductJson;

            /*
                getSkuAdditionalContent
            */

            // Tabular data for PDP.
            parsedReturn.details.tabs = returnsObj.getSkuAdditionalContent;

            return parsedReturn;

        }

        product.data = product.get();

        //
        // product.data = {
        //   name: 'Product One',
        //   skuRefinements: skuRefinements,
        //   details: details,
        //   pricing: pricing
        // };

        // console.log(product.get());

        return product;


    }
];


/*
  Mock Data below this line
  Can remove once services mocked.
*/

/*
    Mock return from getSkuPricePromotions
*/


skuPricePromotions = {
    "skuId": "718218",
    "priceInfo": {
        "listPrice": "14.09",
        "salePrice": "12.39",
        "uomListPrice": "13.8/oz",
        "uomSalePrice": "11.8/oz",
        "promotionId": "promo1234",
        "adBlockId": "43432",
        "browseImageAltText": "Save 10% off",
        "pricingModels": "[arPromotion1,arPromotion2,arPromotion3]",
        "arShortDescription": "Save 10% off",
        "arLongDescription": "Save 10% off",
        "arFutureDescription": "Save 10% off",
        "arAdjustmentPer": "2"
    },
    "statusInfo": {
        "sessionConfirmation": "false",
        "defaultStoreId": "7892",
        "onlineStockStatus": "INSTOCK", //or "OUTOFSTOCK"
        "arInd": 0,
        "bohStockStatus": "NOTAVAILABLE", //or "INSTOCK" or "OUTSTOCK"
        "bohInventory": 6,
        "fsaEligible": 0,
        "spuind": 0, // or 1
        "storeSpuInd": 0, // or 1
        "onSaleFlag": 0,
        "onlineOnly": 0,
        "retailOnly": 0
    },
    "ogProductJson": {
        "id": "634636",
        "today_promo_id": "363463",
        "ongoing_promo_id": "476745",
        "today_discount_percent": "2",
        "ongoing_discount_percent": "4",
        "page_type": 1
    },
    "spinPricing": {
        "promoType": "xForAmount",
        "buyAmount": 2,
        "totalPrice": 2.89,
        "saveAmount": "0.89",
        "spiDesc": "On Select CVS Brand Beauty Products"
    }
};

// Sku Types:
// 0 - Dropdown
// 1 - Color Swatch
// 2 - Thumbnail

/*
    Mock Return from getSkuDetails
*/

skuDetails = {
    "skuId": "32512",
    "detail": {
        "skuId": "32512",
        "description": "SundownNaturalsFishOil1290mgSoftgels",
        "skuSize": "60OZ",
        "shipCalcWeight": "0.12LBS",
        "productId": "prod718218",
        "displayName": "SundownNaturalsFishOil",
        "seoSlug": "/vitamins/supplements/fish-oil-krill-omegas/sundown-naturals-fish-oil-1290-mg-softgels-skuid-32512",
        "similarItemsLink": "/baby-child/bath-skin-care/baby-oil/N-3uZe6vwZ2k",
        "brandId": "2384",
        "brands": "Burt'sBees",
        "upcNumber": "79285071299",
        "topRatedBasedOnAvgRatingAndCount": "0",
        "defaultParentCategory": "cat1234",
        "categoryId": "cat5678",
        "altTxt": "SundownNaturalsFishOil1290mgSoftgels",
        "productReviewCount": "2",
        "quantity": "1",
        "pageCategory": "SHOP",
        "clearanceFlag": "STANDARD",
        "productRecommendedPercent": "",
        "productRating": "5.0",
        "pageName": "SHOP: PRODUCT:SundownNaturalsFishOil1290mgSoftgels(32512)",
        "canonicalProdSlug": "/prod",
        "bvQAFlag": "true"
    },
    "alternateProduct": {
        "alternateProduct": "345345",
        "alternateSeoSlug": "/vitamins/supplements/fish-oil-krill-omegas/Band-Aid-Bandages-Flexible-Fabric-236066",
        "alternateSkuFullName": "SundownNaturalsOil",
        "alternateProductUPCNumber": "3453453453",
        "alternateProductSizeUOMSize": "3oz",
        "alternateProductRating": "4",
        "alternateProductReview": "Good Product",
        "alternateSkuID": "78997",
        "alternateProductShippingSurcharge": "false",
        "alternateProductFreeShippingFlag": "true",
    },
    "auxiliaryMedia": [{
        "hero": "/bizcontent/merchandising/productimages/large/38137003339.jpg",
        "thumb": "/bizcontent/merchandising/productimages/thumb/38137003339.jpg"
    }, {
        "hero": "/bizcontent/merchandising/productimages/large/274134_1.jpg",
        "thumb": "/bizcontent/merchandising/productimages/thumb/274134_1.jpg"
    }, {
        "hero": "/bizcontent/merchandising/productimages/thumb/274134_2.jpg",
        "thumb": "/bizcontent/merchandising/productimages/thumb/274134_2.jpg"
    }, {
        "hero": "/bizcontent/merchandising/productimages/thumb/274134_3.jpg",
        "thumb": "/bizcontent/merchandising/productimages/thumb/274134_3.jpg"
    }, {
        "hero": "/bizcontent/merchandising/productimages/thumb/274134_4.jpg",
        "thumb": "/bizcontent/merchandising/productimages/thumb/274134_4.jpg"
    }],
    "breadCrumb": [{
        "url": "www.cvs.com",
        "label": "Home"
    }, {
        "url": "www.cvs.com/shop",
        "label": "Shop"
    }, {
        "url": "http: //www.cvs.com/shop/vitamins/N-3rZieZ2k",
        "label": "Vitamins"
    }, {
        "url": "www.cvs.com/shop/vitamins/supplements/N-3tZ13hguiZ2k",
        "label": "Supplements"
    }, {
        "url": "www.cvs.com/shop/vitamins/supplements/fish-oil-krill-omegas/N-3uZ13hguoZ2k",
        "label": "FishOil,Krill&Omegas"
    }],
    "validSkus": [32512, 32513],
    "skuGroupInfo": [{
            type: 0,
            label: 'Size',
            contents: [{
                skuId: 123456,
                value: '32',
                label: '32 Oz',
            }, {
                skuId: 654321,
                value: '64',
                label: '64 Oz',
            }]
        }, {
            type: 1,
            label: 'Color',
            contents: [{
                skuId: 123456,
                hex: 'FF0000',
                heroImage: '/heroImage1.png',
                value: '32',
                label: '32 Oz',
            }, {
                skuId: 654321,
                hex: '0000FF',
                heroImage: '/heroImage2.png',
                value: '64',
                label: '64 Oz',
            }]
        }, {
            type: 2,
            label: 'Gallery',
            contents: [{
                skuId: 123456,
                thumb: '/assets/img/product-images/thumbnails/a1.jpg',
                heroImage: '/assets/img/product-images/large/a1.jpg',
                value: '32',
                label: '32 Oz',
            }, {
                skuId: 654321,
                thumb: '/assets/img/product-images/thumbnails/a2.jpg',
                heroImage: '/assets/img/product-images/large/a2.jpg',
                value: '64',
                label: '64 Oz',
            }]
        }, {
            type: 3,
            label: 'DropWithColor',
            contents: [{
                skuId: 123456,
                hex: 'FF0000',
                heroImage: '/heroImage1.png',
                value: '32',
                label: '32 Oz',
            }, {
                skuId: 654321,
                hex: '0000FF',
                heroImage: '/heroImage2.png',
                value: '64',
                label: '64 Oz',
            }]
        }

    ]
};

/*

    Mock return from getSkuAdditionalContent
*/

skuAdditionalContent = {
    "skuId": "718218",
    "detailTab": {
        "overview": "Pediatrician-tested. Hypo-allergenic. Safe. Effective. Natural. Specially formulated with apricot and grape seed oils to gently moisturize and comfort baby''s delicate skin. 100% natural. Natural Personal Care products for The Greater Good. Never any sulfates, parabens, phthalates, or petrochemicals. No animal testing. Made in the USA.",
        "refinements": {
            "FitChoices": {
                "displayGroup": "Yes",
                "bannerImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                "attributesList": [{
                    "attributeName": "RED",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                }, {
                    "attributeName": "BLUE",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                }]
            },
            "HealthGoals": {
                "displayGroup": "Yes",
                "bannerImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                "attributesList": [{
                    "attributeName": "BeautyFromWithin",
                    "priority": "Yes",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                },{
                    "attributeName": "BeautyFromWithin",
                    "priority": "Yes",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                },{
                    "attributeName": "BeautyFromWithin",
                    "priority": "Yes",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                },{
                    "attributeName": "BeautyFromWithin",
                    "priority": "Yes",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                },{
                    "attributeName": "BeautyFromWithin",
                    "priority": "Yes",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                },{
                    "attributeName": "BeautyFromWithin",
                    "priority": "Yes",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                },{
                    "attributeName": "BeautyFromWithin",
                    "priority": "Yes",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                },{
                    "attributeName": "BeautyFromWithin",
                    "priority": "Yes",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                },{
                    "attributeName": "BeautyFromWithin",
                    "priority": "Yes",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                },{
                    "attributeName": "BeautyFromWithin",
                    "priority": "Yes",
                    "iconImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverImageUrl": "/bizcontent/vitaminshop/images/group1background.jpg",
                    "rollOverContent": "/bizcontent/vitaminshop/images/group1background.jpg"
                }]
            }
        }
    },
    "ingredientsTab": {
        "ingredients": "PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVu
        lgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,
        RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,
        Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,
        Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),
        HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.",
        "nutrientFacts": {
            "servingSize": "1softgel",
            "servingsPerContainer: ": "",
            "variation": ""
        },
        "nutrientDetailList": [{
            "nutrient": "PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,
            Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.1softgel",
            "amountperServing": "",
            "dailyValue": ""
        }, {
            "nutrient": "1softgel",
            "amountperServing": "",
            "dailyValue": ""
        }]
    },
    "directionsTab": "PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.PrunusArmeniaca(Apricot)KernelOil,Vinifera(Grape)SeedOil,TriticumVulgare(Wheat)GermOil,Parfum(Fragrance),HelianthusAnnuus(Sunflower)SeedOil,RosmarinusOfficinalis(Rosemary)LeafExtract,Tocopherol,GlycineSoja(Soybean)Oil,Beta-Carotene,CanolaOil(HuileDeColza),Limonene.Addtobathorapplydirectlytoskinafterbathing.Bathtubmaybeslipperyafteruse.",
    "warningsTab": ""
};
