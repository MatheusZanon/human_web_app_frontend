import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface BarChartProps<T> {
    data: T[];
    dataKeyX?: keyof T;
    barKeys?: (keyof T)[];
    title?: string;
    stacked?: boolean;
    xAxisAsMonths?: boolean;
}

// Função para converter índices numéricos para nomes de meses
const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function monthFormatter(value: number): string {
    return monthNames[value - 1]; // Assumindo que os valores variam de 1 a 12
}

// Função para capitalizar string
function capitalize(value: string): string {
    return value
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function BarChartCard<T>({ data, dataKeyX, barKeys, title, stacked, xAxisAsMonths }: BarChartProps<T>) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF7043', '#942EE7', '#E5D7A9', '#EF4444'];
    //const allKeys: string[] = [...new Set(data.flatMap(obj => Object.keys(obj as object)))];

    const chartData =
        data.length > 0
            ? data
            : [
                  { mes: 1, uv: 0.5 },
                  { mes: 2, uv: 0.5 },
                  { mes: 3, uv: 0.5 },
              ];

    return (
        <div className='w-100 p-2'>
            {title && <h5>{title}</h5>}
            <ResponsiveContainer width='100%' height={300}>
                <BarChart width={500} height={300} data={chartData}>
                    <XAxis dataKey={data.length > 0 ? dataKeyX as string : 'mes'} tickFormatter={xAxisAsMonths ? monthFormatter : undefined} />
                    <YAxis domain={chartData.length > 0 ? [0, 1] : ['auto', 'auto']} />
                    <CartesianGrid strokeDasharray='5 5' />
                    <Tooltip />
                    <Legend formatter={(value) => capitalize(value)} />
                    {data.length > 0 &&
                        barKeys?.map((key, index) => (
                            <Bar
                                key={index}
                                dataKey={key as string}
                                stackId={stacked ? '1' : undefined}
                                stroke={COLORS[index % COLORS.length]}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}

                    {data.length === 0 && <Bar dataKey='uv' stackId='1' fill='#8884d8' />}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export { BarChartCard };
