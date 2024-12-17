import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getAverageRatingBySupervisor, getReportResolvedByMonth } from "./statisticApi";
import { IGetReportResolvedByMonthPayload } from "../../../types/Report";
import { Bar } from "react-chartjs-2"; // Import Bar chart component
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Statistic() {
    const dispatch = useAppDispatch();
    const reportsResolvedByMonth = useAppSelector(store => store.statistic.reportByMonth);
    // const ratingBySupervisor = useAppSelector(store => store.statistic.ratingBySupervisor);

    const [statisticOption, setStatisticOption] = useState<number>(1);
    const [year, setYear] = useState<number>(2023);

    useEffect(() => {
        const payload: IGetReportResolvedByMonthPayload = { year: year };
        dispatch(getReportResolvedByMonth(payload));
    }, [year, dispatch]);

    useEffect(() => {
        dispatch(getAverageRatingBySupervisor());
    }, [dispatch]);

    // Bar Chart Data for Reports Resolved by Month
    const barChartDataReports = {
        labels: Object.keys(reportsResolvedByMonth.monthlyReportCounts), // Months
        datasets: [
            {
                label: `Reports Resolved (${year})`,
                data: Object.values(reportsResolvedByMonth.monthlyReportCounts), // Monthly report counts
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Bar Chart Data for Average Ratings
    // const barChartDataRatings = {
    //     labels: ratingBySupervisor.supervisorRatings.map(rating => `Supervisor ${rating.supervisorId}`),
    //     datasets: [
    //         {
    //             label: "Average Ratings (1-5 Scale)",
    //             data: ratingBySupervisor.supervisorRatings.map(rating => rating.rating),
    //             backgroundColor: "rgba(255, 99, 132, 0.5)",
    //             borderColor: "rgba(255, 99, 132, 1)",
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    // Bar Chart Options
    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allows height/width customization
        plugins: {
            legend: { position: "top" as const },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: statisticOption === 2 ? 5 : undefined, // For ratings, limit to 5
            },
        },
    };

    return (
        <div style={{ height: "100%", width: "100%" }}>
            {/* <select
                className="form-select"
                onChange={(e) => {
                    setStatisticOption(Number(e.target.value));
                }}
                value={statisticOption}
            >
                <option value={1}>Số lượng báo cáo xử lý theo tháng</option>
                <option value={2}>Đánh giá trung bình</option>
            </select> */}
            <div>Số lượng báo cáo xử lý theo tháng</div>

            {statisticOption === 1 && (
                <div className="mt-2" >
                    <label htmlFor="year">Chọn năm</label>
                    <select
                        className="form-select mt-1"
                        id="year"
                        onChange={(e) => {
                            setYear(Number(e.target.value));
                        }}
                        value={year}
                    >
                        <option value={2023}>2023</option>
                        <option value={2024}>2024</option>
                    </select>
                    <div className="mt-3" style={{ height: "50vh" }}>
                        <Bar data={barChartDataReports} options={barChartOptions} />
                    </div>
                </div>
            )}

            {/* {statisticOption === 2 && (
                <div className="mt-2">
                    <div className="mt-3" style={{ height: "50vh" }}>
                        <Bar data={barChartDataRatings} options={barChartOptions} />
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default Statistic;
