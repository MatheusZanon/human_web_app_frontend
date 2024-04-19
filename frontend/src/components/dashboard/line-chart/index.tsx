import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LineChartProps {
    data: object[];
    dataKeyX: string;
    title?: string;
    connectNulls?: boolean;
}

function LineChartCard({ data, dataKeyX, title, connectNulls }: LineChartProps) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF7043', '#942EE7', '#E5D7A9', '#EF4444'];
    const chartData = data.length > 0 ? data : [{ uv: 0.5 }, { uv: 0.5 }, { uv: 0.5 }];

    const allKeys = chartData.reduce<string[]>((acc, obj) => {
        Object.keys(obj).forEach((key) => {
            if (!acc.includes(key)) {
                acc.push(key);
            }
        });
        return acc;
    }, []);

    // Remove a chave 'name' dos dados das chaves
    const keys = allKeys.filter((key) => key !== dataKeyX);

    return (
        <div className='d-flex flex-column gap-2 w-100'>
            {title && <h5>{title}</h5>}
            <ResponsiveContainer width='100%' height={300}>
                <LineChart width={500} height={300} data={chartData}>
                    <XAxis dataKey={dataKeyX} />
                    <YAxis domain={chartData.length > 0 ? [0, 1] : ['auto', 'auto']} />
                    <CartesianGrid strokeDasharray='5 5' />
                    <Tooltip />
                    <Legend />

                    {keys.map((key, index) => (
                        <Line
                            key={index}
                            connectNulls={connectNulls}
                            type='bump'
                            dataKey={key}
                            stroke={COLORS[index % COLORS.length]}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export { LineChartCard };
