interface EmptyStateProps {
    message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
    return (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
            {message}
        </div>
    );
}
