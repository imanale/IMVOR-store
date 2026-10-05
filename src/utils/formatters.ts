/**
 * Currency Formatting Rule according to PRD:
 * All prices must display with standard Pakistani thousands separators and currency symbols (e.g., ₨ 14,500).
 */
export function formatPKR(amount: number): string {
  if (isNaN(amount)) return '₨ 0';
  const rounded = Math.round(amount);
  return `₨ ${rounded.toLocaleString('en-PK')}`;
}

export function formatHoldTimer(seconds: number): string {
  if (seconds <= 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function validateCNIC(cnic: string): boolean {
  // Accepts standard 13 digits with or without hyphens: 12345-1234567-1 or 1234512345671
  const clean = cnic.replace(/[^0-9]/g, '');
  return clean.length === 13;
}

export function formatCNIC(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 13);
  if (digits.length <= 5) {
    return digits;
  } else if (digits.length <= 12) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  } else {
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
  }
}

export function formatPakistaniPhone(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 4) return digits;
  return `${digits.slice(0, 4)}-${digits.slice(4)}`;
}
