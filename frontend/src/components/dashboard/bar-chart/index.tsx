import { capitalize } from '@/libs';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface BaseBarChartProps {
    title?: string;
    stacked?: boolean;
    xAxisAsMonths?: boolean;
    syncId?: string;
}

interface WithData<T> extends BaseBarChartProps {
    data: T[];
    dataKeyX: keyof T;
    barKeys: (keyof T)[];
}

interface WithoutData extends BaseBarChartProps {
    data?: undefined;
    dataKeyX?: undefined;
    barKeys?: undefined;
}

type BarChartProps<T> = WithData<T> | WithoutData;

// Função para converter índices numéricos para nomes de meses
const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function monthFormatter(value: number): string {
    if (value === null || value === undefined) {
        throw new Error('Invalid value for month formatter');
    }
    if (value < 1 || value > 12) {
        throw new Error('Value out of range for month formatter');
    }
    return monthNames[value - 1]; // Assumindo que os valores variam de 1 a 12
}

function BarChartCard<T>({ data, dataKeyX, barKeys, syncId, title, stacked, xAxisAsMonths }: BarChartProps<T>) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF7043', '#942EE7', '#E5D7A9', '#EF4444'];

    const chartData = data
        ? data
        : [
              { mes: 1, uv: 0.5 },
              { mes: 2, uv: 0.5 },
              { mes: 3, uv: 0.5 },
          ];

    const keys = barKeys
        ? barKeys
        : chartData
              .reduce<string[]>((acc, obj) => {
                  Object.keys(obj as object).forEach((key) => {
                      if (!acc.includes(key)) {
                          acc.push(key);
                      }
                  });
                  return acc;
              }, [])
              .filter((key) => key !== 'mes');

    return (
        <div className='w-100 p-2'>
            {title && <h5>{title}</h5>}
            <ResponsiveContainer width='100%' className={'p-2'} height={300}>
                <BarChart width={500} height={300} data={chartData} syncId={syncId}>
                    <XAxis
                        dataKey={(dataKeyX as string) || 'mes'}
                        tickFormatter={data && xAxisAsMonths ? monthFormatter : !data ? monthFormatter : undefined}
                    />
                    <YAxis domain={chartData.length > 0 ? ['auto', 'auto'] : [0, 1]} width={80} allowDataOverflow />
                    <CartesianGrid strokeDasharray='5 5' />
                    <Tooltip />
                    <Legend formatter={(value) => capitalize(value)} />
                    {keys.map((key, index) => (
                        <Bar
                            key={index}
                            dataKey={key as string}
                            stackId={stacked ? '1' : undefined}
                            stroke={COLORS[index % COLORS.length]}
                            fill={COLORS[index % COLORS.length]}
                            name={data ? (key as string) : 'Vazio'}
                        />
                    ))}

                    {chartData.length === 0 && <Bar dataKey='uv' stackId='1' fill='#8884d8' />}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export { BarChartCard };
