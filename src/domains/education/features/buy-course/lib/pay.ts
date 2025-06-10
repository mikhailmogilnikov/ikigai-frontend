/* eslint-disable lingui/no-unlocalized-strings */
import { Locale } from '~/domains/global/entities/i18n';
import '~/shared/lib/types/cloudpayments.d.ts';

interface PayConfig {
  language: `${Locale}`;
  publicId: string;
  description: string;
  amount: number;
  currency: string;
  accountId?: string;
  invoiceId?: string;
  email?: string;
  skin?: 'classic' | 'modern' | 'mini';
  autoClose?: number;
}

type CloudPaymentsCallbackOptions = Record<string, unknown>;

interface CloudPaymentsPaymentResult {
  success: boolean;
  [key: string]: unknown;
}

interface PayCallbacks {
  onSuccess: (options: CloudPaymentsCallbackOptions) => void;
  onFail: (reason: string, options: CloudPaymentsCallbackOptions) => void;
  onComplete: (paymentResult: CloudPaymentsPaymentResult, options: CloudPaymentsCallbackOptions) => void;
}

const CloudpaymentsLanguage: Record<`${Locale}`, string> = {
  ru: 'ru-RU',
  en: 'en-US',
};

export function pay(config: PayConfig, callbacks: PayCallbacks) {
  const { language, publicId, description, amount, currency, accountId, invoiceId, skin, autoClose, email } = config;
  const { onSuccess, onFail, onComplete } = callbacks;

  const widget = new window.cp.CloudPayments({
    language: CloudpaymentsLanguage[language],
  });

  widget.pay(
    'auth', // или 'charge'
    {
      publicId,
      description,
      amount,
      currency,
      accountId,
      invoiceId,
      skin: skin ?? 'modern',
      autoClose,
      email,
    },
    {
      onSuccess,
      onFail,
      onComplete,
    },
  );
}
