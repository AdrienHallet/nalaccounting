import type { Balance } from "$lib/logic/model/balance";
import colors from "tailwindcss/colors";

export const balanceConfig = (balances: Balance[]) => {
    return {
        type: "line",
        data: {
            datasets: [
                {
                    data: balances,
                    backgroundColor: colors.zinc[300],
                    borderColor: colors.zinc[600],
                },
            ],
        },
        options: {
            parsing: {
                xAxisKey: "date",
                yAxisKey: "amount",
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    position: 'right',
                    grid: {
                        color: colors.zinc[700],
                    }
                },
                x: {
                    grid: {
                        display: false,
                    }
                }
            }
        },
    }
};