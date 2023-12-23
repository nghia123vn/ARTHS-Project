export const formatPrice = (price: number | undefined) => {
    if (price) {
        const formattedPrice = (price / 1000).toLocaleString(undefined, { minimumFractionDigits: 3 });

        return formattedPrice.replace(",", ".");

    }

}