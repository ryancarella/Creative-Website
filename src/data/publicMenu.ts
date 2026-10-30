export type MenuProduct = {
 id: string; name: string; description: string; price: number; currency: string; unit: string; features: string; addons: string; proposedFeatures: boolean
}

export const publicMenu: MenuProduct[] = [
  {
    "id": "chicken",
    "name": "Chicken & rice bowl",
    "description": "Proposed customizable chicken and rice bowl.",
    "price": 14,
    "currency": "USD",
    "unit": "per item",
    "features": "Measured portions; visible calories and macros; sauce choices. Proposed, not validated.",
    "addons": "Extra protein considered; no add-on price confirmed.",
    "proposedFeatures": true
  },
  {
    "id": "beef",
    "name": "Ground beef bowl",
    "description": "Proposed ground beef meal bowl.",
    "price": 15,
    "currency": "USD",
    "unit": "per item",
    "features": "Customizable portions and sauces. Proposed, not validated.",
    "addons": "None priced.",
    "proposedFeatures": true
  },
  {
    "id": "pasta",
    "name": "Pasta meal",
    "description": "Proposed pasta meal; recipe unconfirmed.",
    "price": 13,
    "currency": "USD",
    "unit": "per item",
    "features": "Portion and nutrition labeling planned; recipe unvalidated.",
    "addons": "None priced.",
    "proposedFeatures": true
  },
  {
    "id": "bar",
    "name": "Protein bar",
    "description": "Proposed packaged protein bar; supplier unconfirmed.",
    "price": 3.5,
    "currency": "USD",
    "unit": "per item",
    "features": "Convenient snack; brand and nutrition unconfirmed.",
    "addons": "None priced.",
    "proposedFeatures": true
  },
  {
    "id": "shake",
    "name": "Protein shake",
    "description": "Proposed protein shake; recipe unconfirmed.",
    "price": 6,
    "currency": "USD",
    "unit": "per item",
    "features": "Convenient protein option; ingredients and macros unvalidated.",
    "addons": "None priced.",
    "proposedFeatures": true
  }
]

export const formatPrice = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
