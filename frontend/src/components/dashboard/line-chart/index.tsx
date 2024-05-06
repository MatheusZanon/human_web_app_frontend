import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface BaseLineChartProps {
    title?: string;
    connectNulls?: boolean;
    syncId?: string;
}

interface WithData<T> extends BaseLineChartProps {
    data: T[];
    dataKeyX: keyof T;
    labelBy: keyof T;
}

interface WithoutData extends BaseLineChartProps {
    data?: undefined;
    dataKeyX?: undefined;
    labelBy?: undefined;
}

type LineChartProps<T> = WithData<T> | WithoutData;

function LineChartCard<T>({ data, dataKeyX, labelBy, title, connectNulls, syncId }: LineChartProps<T>) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF7043', '#942EE7', '#E5D7A9', '#EF4444'];
    const chartData = data ? data : [{ uv: 0.5 }, { uv: 0.5 }, { uv: 0.5 }];

    const keys = chartData
        .reduce<string[]>((acc, obj) => {
            Object.keys(obj as object).forEach((key) => {
                if (!acc.includes(key)) {
                    acc.push(key);
                }
            });
            return acc;
        }, [])
        .filter((key) => key !== dataKeyX);

    return (
        <div className='d-flex flex-column gap-2 w-100'>
            {title && <h5>{title}</h5>}
            <ResponsiveContainer width={'100%'} height={300}>
                <LineChart width={500} height={300} data={chartData} syncId={syncId}>
                    <XAxis dataKey={dataKeyX as string} />
                    <YAxis domain={data ? ['auto', 'auto'] : [0, 1]} tickSize={0} width={80} allowDataOverflow />
                    <CartesianGrid strokeDasharray='5 5' />
                    <Tooltip />
                    <Legend />

                    {keys.map((key, index) => (
                        <Line
                            key={index}
                            connectNulls={connectNulls}
                            type='bump'
                            dataKey={key as string}
                            stroke={COLORS[index % COLORS.length]}
                            fill={COLORS[index % COLORS.length]}
                            name={data ? (labelBy as string) : 'Vazio'}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export { LineChartCard };
