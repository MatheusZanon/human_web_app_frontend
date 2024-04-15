import { AreaChartCard } from '@/components/dashboard/area-chart';
import { BarChartCard } from '@/components/dashboard/bar-chart';
import { LineChartCard } from '@/components/dashboard/line-chart';
import { PieChartCard } from '@/components/dashboard/pie-chart';

function Dashboard() {
    const mockData = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            kv: 3600,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            kv: 2910,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            kv: 6870,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            kv: 4370,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            kv: 4990,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            kv: 1370,
            amt: 2100,
        },
    ];

    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ];
    return (
        <div className='d-flex flex-column gap-4 px-3 pb-3 shadow rounded mb-2'>
            <h1>Dashboard</h1>
            <div className='d-flex gap-4'>
                <BarChartCard data={mockData} title='Bar Chart' />
                <AreaChartCard data={mockData} title='Area Chart' connectNulls stacked />
            </div>
            <div className='d-flex gap-4'>
                <LineChartCard data={mockData} title='Line Chart' connectNulls />
                <PieChartCard data={data01} title='Pie Chart' />
            </div>
        </div>
    );
}

export default Dashboard;
