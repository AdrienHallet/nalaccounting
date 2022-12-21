import type { CategoryCount } from "$lib/logic/database/graph/category";
import colors from "tailwindcss/colors";

export const categoryCountConfig = (categoryCounts: CategoryCount[]) => {
    return {
        type: "doughnut",
        data: {
            labels: categoryCounts.map(categoryCount => categoryCount.category?.name),
            datasets: [
                {
                    data: categoryCounts.map(categoryCount => categoryCount.count),
                    backgroundColor: [
                        colors.zinc[300], 
                        colors.zinc[400],
                        colors.zinc[500],
                        colors.zinc[600],
                        colors.zinc[700],
                        colors.zinc[800],
                        colors.zinc[900],
                    ],
                    borderColor: colors.zinc[600],
                },
            ],
        },
        options: {

            maintainAspectRatio: false,
        }
    }
};