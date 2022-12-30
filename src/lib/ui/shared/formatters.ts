export const amountFormat = (x: number | string) => {
    if (x == null) {
        return x;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}