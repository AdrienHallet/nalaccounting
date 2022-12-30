export const amountFormat = (x: number | string) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}