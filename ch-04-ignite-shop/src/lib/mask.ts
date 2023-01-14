export function maskString(value?: string, pattern?: string) {
  if (!value || !pattern) {
    return '--';
  }

  let i = 0;
  const v = value.toString();

  return pattern.replace(/#/g, (_) => v[i++]).replace(/undefined/g, '');
}

export function maskPhoneDDI(value?: string) {
  return maskString(value, '(##) #####-####');
}

export function maskCNPJ(value?: string) {
  return maskString(value, '##.###.###/####-##');
}

export function maskCPF(value?: string) {
  return maskString(value, '###.###.###-##');
}
