interface CloudPaymentsPaymentOptions {
  publicId: string;
  description: string;
  amount: number;
  currency: string;
  accountId?: string;
  invoiceId?: string;
  skin?: string;
  autoClose?: number;
  email?: string;
}

type CloudPaymentsCallbackOptions = Record<string, unknown>;

interface CloudPaymentsPaymentResult {
  success: boolean;
  [key: string]: unknown;
}

declare global {
  interface Window {
    cp: {
      CloudPayments: new (config: { language: string }) => {
        pay: (
          action: 'auth' | 'charge',
          options: CloudPaymentsPaymentOptions,
          callbacks: {
            onSuccess?: (options: CloudPaymentsCallbackOptions) => void;
            onFail?: (reason: string, options: CloudPaymentsCallbackOptions) => void;
            onComplete?: (paymentResult: CloudPaymentsPaymentResult, options: CloudPaymentsCallbackOptions) => void;
          },
        ) => void;
      };
    };
  }
}

export {};
