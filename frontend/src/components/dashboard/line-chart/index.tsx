import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LineChartProps {
    data: Record<string, unknown>[];
    title?: string;
    connectNulls?: boolean;
}

function LineChartCard({ data, title, connectNulls }: LineChartProps) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF7043', '#942EE7', '#E5D7A9', '#EF4444'];

    const allKeys = data.reduce<string[]>((acc, obj) => {
        Object.keys(obj).forEach((key) => {
            if (!acc.includes(key)) {
                acc.push(key);
            }
        });
        return acc;
    }, []);

    // Remove a chave 'name' dos dados das chaves
    const keys = allKeys.filter((key) => key !== 'name');

    return (
        <div className='w-100 p-2 rounded shadow'>
            {title && <h5>{title}</h5>}
            <ResponsiveContainer width='100%' height={300}>
                <LineChart width={500} height={300} data={data}>
                    <XAxis dataKey='name' />
                    <YAxis />
                    <CartesianGrid strokeDasharray='5 5' />
                    <Tooltip />
                    <Legend />

                    {keys.map((key, index) => (
                        <Line
                            key={index}
                            connectNulls={connectNulls}
                            type='monotone'
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
