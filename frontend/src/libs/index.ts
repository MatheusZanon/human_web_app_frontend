import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import * as ptBR from 'dayjs/locale/pt-br';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.locale(ptBR);

export function toUnixTimestamp(date: Date) {
  return dayjs(date).unix();
}

export function fromUnixTimestamp(timestamp: number) {
  return dayjs.unix(timestamp).toDate();
}

export function fromNow(date: Date) {
  return dayjs(date).fromNow();
}

export function toNow(date: Date) {
  return dayjs(date).toNow();
}

export function formatDate(date: Date) {
  return dayjs(date).format('DD/MM/YYYY');
}

export function fromUtcDate(date: string) {
  return dayjs.utc(date).toDate();
}

export function formatDateTime(date: Date) {
  return dayjs(date).format('DD/MM/YYYY HH:mm');
}

export function formatTime(date: Date) {
  return dayjs(date).format('HH:mm');
}

export function formatCellphone(number: string) {
  return number.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}
