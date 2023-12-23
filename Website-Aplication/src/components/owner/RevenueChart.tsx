// src/components/RevenueChart.js
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { itemRevenue, itemStatics, pagination, selectorRevenue, selectorStatics } from '@/types/revenue';
import { getRevenue, getStatics } from '@/actions/revenue';
import { formatDateFeedback } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { selectorProduct } from '@/types/actions/product';
import { typeActiveProduct } from '@/types/typeProduct';
import { ShowProduct } from '@/actions/product';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const RevenueChart = () => {
    const dispatch = useDispatch();
    const motorbikeProduct = useSelector((state: selectorProduct<string, number>) => state.productReducer?.productInfor);
    const revenueInfo = useSelector((state: selectorRevenue<string, number>) => state.revenueReducer?.revenueInfo);
    const staticsInfo: itemStatics<string, number>[] = useSelector((state: selectorStatics<string, number>) => state.staticsReducer?.staticsInfo);
    const [productData, setProductData] = useState<pagination<number>>();
    const [staticsData, setStaticsData] = useState<itemStatics<string, number>[]>([]);
    const [revenueData, setRevenueData] = useState<itemRevenue<string, number>[]>([]);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [modalContent, setModalContent] = useState<ModalContent>({ month: '', transactions: [] });
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());


    //console.log('product', motorbikeProduct.pagination.totalRow)

    interface ChartDataSet {
        label: string;
        data: number[];
        backgroundColor: string;
    }

    interface ChartData {
        labels: string[];
        datasets: ChartDataSet[];
    }

    interface ModalContent {
        month: string;
        transactions: itemRevenue<string, number>[];
    }
    interface TotalsByType {
        [key: string]: number;
    }

    interface PieChartDataSet {
        label: string;
        data: number[];
        backgroundColor: string[];
    }

    interface PieChartData {
        labels: string[];
        datasets: PieChartDataSet[];
    }

    const [orderTypePieChartData, setOrderTypePieChartData] = useState<PieChartData>({
        labels: [],
        datasets: [
            {
                label: 'Doanh thu',
                data: [],
                backgroundColor: [],
            },
        ],
    });

    const [isOrderPieChartData, setIsOrderPieChartData] = useState<PieChartData>({
        labels: [],
        datasets: [
            {
                label: 'Doanh thu',
                data: [],
                backgroundColor: [],
            },
        ],
    });

    const processRevenueData = (revenueData: itemStatics<string, number>[]) => {
        const revenueByMonth = new Array(12).fill(0);
        revenueData.forEach(item => {
            const transactionDate = new Date(item.transactionDate);
            const month = transactionDate.getMonth();
            revenueByMonth[month] += item.totalAmount;
        });
        return revenueByMonth;
    };

    const calculateTotalAnnualRevenue = (revenueData: itemStatics<string, number>[]) => {
        const monthlyRevenue = processRevenueData(revenueData);
        const totalAnnualRevenue = monthlyRevenue.reduce((acc, total) => acc + total, 0);
        //console.log('Doanh thu', totalAnnualRevenue)
        return totalAnnualRevenue;
    };


    const processOrderTypePieChartData = (data: itemStatics<string, number>[]) => {
        //console.log('statics', data)

        const totalsByType = data.reduce((acc: TotalsByType, item) => {
            acc[item.orderType] = (acc[item.orderType] || 0) + item.totalAmount;
            return acc;
        }, {} as TotalsByType);

        return {
            labels: Object.keys(totalsByType),
            datasets: [
                {
                    label: 'Doanh thu',
                    data: Object.values(totalsByType),
                    backgroundColor: Object.keys(totalsByType).map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`),
                },
            ],
        };
    };

    const processIsOrderPieChartData = (data: itemStatics<string, number>[]) => {
        const totalsByType = data.reduce((acc: TotalsByType, item) => {
            acc[item.isOrder] = (acc[item.isOrder] || 0) + item.totalAmount;
            return acc;
        }, {} as TotalsByType);

        return {
            labels: Object.keys(totalsByType),
            datasets: [
                {
                    label: 'Doanh thu',
                    data: Object.values(totalsByType),
                    backgroundColor: Object.keys(totalsByType).map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`),
                },
            ],
        };
    };

    const [chartData, setChartData] = useState<ChartData>({
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Doanh thu',
                data: new Array(12).fill(0), // Initialize with zeros for each month
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }
        ]
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChartClick = (_event: any, elements: string | any[]) => {
        if (elements.length === 0) return;

        const elementIndex = elements[0].index;
        const selectedMonthValue = elementIndex; // Save the selected month value
        setSelectedMonth(selectedMonthValue);

        const transactionsOfMonth = revenueData.filter(item => new Date(item.transactionDate).getMonth() === selectedMonthValue);
        setModalContent({ month: `Tháng ${selectedMonthValue + 1}`, transactions: transactionsOfMonth });

        const staticOfMonth = staticsData.filter(item => new Date(item.transactionDate).getMonth() === selectedMonthValue);
        const pieData = processOrderTypePieChartData(staticOfMonth);
        setOrderTypePieChartData(pieData);

        const secondPieData = processIsOrderPieChartData(staticOfMonth)
        setIsOrderPieChartData(secondPieData)
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,

    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        onClick: onChartClick,
    };

    const handleYearChange = (event: { target: { value: string; }; }) => {
        const year = parseInt(event.target.value, 10);
        setSelectedYear(year);
    };

    useEffect(() => {
        if (revenueInfo.pagination?.totalRow) {
            setPaginationNumber(0);
        }
    }, [revenueInfo.pagination?.totalRow]);

    useEffect(() => {
        const filters = {
            status: 'Thành công',
            month: selectedMonth + 1,
            year: selectedYear,
            pageSize: 100,
        };
        const data = {
            number: paginationNumber,
            status: typeActiveProduct.Active,
        }
        // Fetch data for the selected year
        dispatch(getStatics({ year: selectedYear }));
        dispatch(getRevenue(paginationNumber, filters));
        dispatch(ShowProduct(data));
    }, [dispatch, selectedYear, paginationNumber, selectedMonth]);


    useEffect(() => {
        setRevenueData(revenueInfo.data);
        setStaticsData(staticsInfo);
        setProductData(motorbikeProduct.pagination)
    }, [revenueInfo.data, staticsInfo, motorbikeProduct.pagination]);

    useEffect(() => {
        if (staticsData && staticsData.length >= 0) {
            const currentMonth = selectedMonth;
            const processedData = processRevenueData(staticsData);
            setChartData(prevState => {
                const newData = [...prevState.datasets[0].data];
                processedData.forEach((amount, month) => {
                    newData[month] = amount;
                });
                return {
                    ...prevState,
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: newData,
                        }
                    ],
                };
            });
            //const currentMonthTransactions = revenueData.filter(item => new Date(item.transactionDate).getMonth() === currentMonth);
            setModalContent({ month: `Tháng ${currentMonth + 1}`, transactions: revenueData });
            const currentMonthStatics = staticsData.filter(item => new Date(item.transactionDate).getMonth() === currentMonth);
            const pieData = processOrderTypePieChartData(currentMonthStatics);
            setOrderTypePieChartData(pieData);

            const secondPieData = processIsOrderPieChartData(currentMonthStatics)
            setIsOrderPieChartData(secondPieData);
        }
    }, [staticsData, revenueData]);




    return (
        <>

            <div className="p-3 bg-white shadow rounded-lg w-full flex flex-wrap justify-between mb-3">
                {/* Thêm phần hiển thị thông tin tổng doanh thu, tổng đơn hàng và tổng sản phẩm ở đây */}
                <div className="w-full mt-4 p-2">
                    <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        Thông Tin Tổng Hợp của năm
                        <select
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="ml-2 p-1 border border-gray-300 rounded-md"
                        >
                            {/* Generate options for the last 5 years (adjust as needed) */}
                            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tổng Doanh Thu</h3>
                            <p className="text-gray-600">{formatPrice(calculateTotalAnnualRevenue(staticsData))} VNĐ</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Số lượng giao dịch</h3>
                            <p className="text-gray-600">{staticsData.length}</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tổng Sản Phẩm</h3>
                            <p className="text-gray-600">{productData?.totalRow}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-3 bg-white shadow rounded-lg w-full flex flex-wrap justify-between items-center">
                <div className="w-full mb-4 p-2">
                    <div className="border border-gray-200 rounded-lg mb-4 p-2">
                        <h2 className="text-lg font-bold text-gray-800 mb-3">Biểu Đồ Doanh Thu Năm {selectedYear}</h2>
                        <div className="w-full h-96">
                            <Bar data={chartData} options={{ ...options, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
                <div className="space-y-4 w-full border border-gray-200 rounded-lg p-2">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Phân loại giao dịch tháng {selectedMonth + 1}</h2>
                    <div className='flex w-full'>
                        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
                            <div className="">
                                <div className="h-96">
                                    {/* Set a fixed height */}
                                    <Pie data={orderTypePieChartData} options={{ ...pieOptions, maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
                            <div className="">
                                <div className="h-96">
                                    {/* Set a fixed height */}
                                    <Pie data={isOrderPieChartData} options={{ ...pieOptions, maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {modalContent && modalContent.transactions && modalContent.transactions.length > 0 && (
                <div className="mt-5 mb-5 bg-white">
                    <h3 className="text-xl font-semibold mb-2 px-2 py-3">Chi Tiết Doanh Thu - {modalContent.month}</h3>
                    <div className="overflow-auto max-h-[400px] bg-white"> {/* Adjust max height as needed */}
                        <table className="w-full text-sm text-left text-gray-900">
                            <thead className="text-xs text-white uppercase bg-main dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6 border border-gray-300">Ngày giao dịch</th>
                                    <th scope="col" className="py-3 px-6 border border-gray-300">Mã đơn hàng</th>
                                    <th scope="col" className="py-3 px-6 border border-gray-300">Loại Giao Dịch</th>
                                    <th scope="col" className="py-3 px-6 border border-gray-300">Số Tiền</th>
                                    <th scope="col" className="py-3 px-6 border border-gray-300">Phương Thức Thanh Toán</th>
                                    <th scope="col" className="py-3 px-6 border border-gray-300">Loại</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-gray-700">
                                {modalContent.transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-100 transition-all duration-200">
                                        <td className="py-4 px-6 border border-gray-300">{formatDateFeedback(transaction.transactionDate?.toString())}</td>
                                        <td className="py-4 px-6 border border-gray-300">{transaction.orderId}</td>
                                        <td className="py-4 px-6 border border-gray-300">{transaction.type}</td>
                                        <td className="py-4 px-6 border border-gray-300">{formatPrice(transaction.totalAmount)}</td>
                                        <td className="py-4 px-6 border border-gray-300">{transaction.paymentMethod}</td>
                                        <td className="py-4 px-6 border border-gray-300">{transaction.orderType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default RevenueChart;