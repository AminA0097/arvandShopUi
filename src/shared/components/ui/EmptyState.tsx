import { ReactNode } from "react";
import { Package, ShoppingBag } from "lucide-react";
import Button from "./Button";
import Card from "./Card";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    action?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
}

export default function EmptyState({
                                       title,
                                       description,
                                       icon,
                                       action,
                                   }: EmptyStateProps) {
    return (
        <Card className="text-center py-12">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-surface-muted flex items-center justify-center mb-4">
                    {icon || <Package size={32} className="text-text-muted" />}
                </div>

                <h3 className="text-lg font-semibold text-text mb-1">{title}</h3>

                {description && (
                    <p className="text-sm text-text-secondary mb-6">{description}</p>
                )}

                {action && (
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={action.onClick}
                        icon={<ShoppingBag size={16} />}
                    >
                        {action.label}
                    </Button>
                )}
            </div>
        </Card>
    );
}