import { Robo } from '@/utils/types/robo';

export function getRobos() {
  const data: Robo[] = [
    {
      id: 1,
      image: 'https://dummyimage.com/500x357/000/fff',
      name: 'Robô 1',
      description: 'Robô para registrar o ponto de entrada e saída do funcionário',
      executions: Number((Math.random() * 100).toFixed(0)),
      last_execution: Math.floor(Math.random() * (Date.now() / 1000 - 31536000)),
      details_link: '#',
      btn: 'Executar',
    },
    {
      id: 2,
      image: 'https://dummyimage.com/500x357/000/fff',
      name: 'Robô 2',
      description: 'Robô para registrar o ponto de entrada e saída do funcionário',
      executions: Number((Math.random() * 100).toFixed(0)),
      last_execution: Math.floor(Math.random() * (Date.now() / 1000 - 31536000)),
      details_link: '#',
      btn: 'Executar',
    },
    {
      id: 3,
      image: 'https://dummyimage.com/500x357/000/fff',
      name: 'Robô 3',
      description: 'Robô para registrar o ponto de entrada e saída do funcionário',
      executions: Number((Math.random() * 100).toFixed(0)),
      last_execution: Math.floor(Math.random() * (Date.now() / 1000 - 31536000)),
      details_link: '#',
      btn: 'Executar',
    },
    {
      id: 4,
      image: 'https://dummyimage.com/500x357/000/fff',
      name: 'Robô 4',
      description: 'Robô para registrar o ponto de entrada e saída do funcionário',
      executions: Number((Math.random() * 100).toFixed(0)),
      last_execution: Math.floor(Math.random() * (Date.now() / 1000 - 31536000)),
      details_link: '#',
      btn: 'Executar',
    },
  ];

  return data;
}
