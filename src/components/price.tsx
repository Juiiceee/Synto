import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  currencyCodeClassName
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => {
  // Gérer spécifiquement SONIC
  if (currencyCode === 'SONIC') {
    return (
      <p suppressHydrationWarning={true} className={className}>
        {parseFloat(amount).toFixed(2)}
        <span className={clsx('ml-1 inline', currencyCodeClassName)}>SONIC</span>
      </p>
    );
  }
  
  // Code existant pour les autres devises
  return (
    <p suppressHydrationWarning={true} className={className}>
      {`${new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
      }).format(parseFloat(amount))}`}
      <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
    </p>
  );
};

export default Price;