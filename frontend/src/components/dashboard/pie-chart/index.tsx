import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface BasePieChartProps {
    title?: string;
}

interface WithData<T> extends BasePieChartProps {
    data: T[];
    dataKey: keyof T;
    labelBy: keyof T;
}

interface WithoutData extends BasePieChartProps {
    data?: undefined;
    dataKey?: undefined;
    labelBy?: undefined;
}

type PieChartProps<T> = WithData<T> | WithoutData;

function PieChartCard<T>({ data, dataKey, labelBy, title }: PieChartProps<T>) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF7043', '#942EE7', '#E5D7A9', '#EF4444'];
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }: {
        cx: number;
        cy: number;
        midAngle: number;
        innerRadius: number;
        outerRadius: number;
        percent: number;
        index: number;
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill='white'
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline='central'
                style={{ pointerEvents: 'none' }}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='w-100 p-2'>
            {title && <h5>{title}</h5>}
            <ResponsiveContainer width='100%' height={300}>
                <PieChart width={500} height={300}>
                    <Legend />
                    <Tooltip />

                    <Pie
                        data={data ? data : [{ name: 'Vazio', value: 1 }]}
                        cx='50%'
                        cy='50%'
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill='#8884d8'
                        dataKey={dataKey as string}
                    >
                        {data?.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                style={{ outline: 'none' }}
                                name={entry[labelBy as keyof T] as string}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export { PieChartCard };
