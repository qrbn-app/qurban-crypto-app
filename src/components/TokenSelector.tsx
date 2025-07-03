
import { Card, CardContent } from "@/components/ui/card";

interface Token {
  symbol: string;
  name: string;
  icon: string;
}

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: string;
  onTokenSelect: (symbol: string) => void;
}

const TokenSelector = ({ tokens, selectedToken, onTokenSelect }: TokenSelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {tokens.map((token) => (
        <Card
          key={token.symbol}
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedToken === token.symbol
              ? "border-2 border-primary shadow-lg bg-primary/5"
              : "border-2 border-transparent hover:border-gray-200"
          }`}
          onClick={() => onTokenSelect(token.symbol)}
        >
          <CardContent className="flex items-center space-x-3 p-4">
            <div className="text-2xl">{token.icon}</div>
            <div>
              <div className="font-semibold text-gray-900">{token.symbol}</div>
              <div className="text-sm text-gray-500">{token.name}</div>
            </div>
            {selectedToken === token.symbol && (
              <div className="text-primary">✓</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { TokenSelector };
