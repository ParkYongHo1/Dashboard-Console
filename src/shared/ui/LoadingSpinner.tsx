interface LoadingSpinnerProps {
  overlay?: boolean;
  text?: string;
}

export const LoadingSpinner = ({ overlay = true, text = "잠시만요" }: LoadingSpinnerProps) => {
  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-gray-800 animate-spin" />
      </div>
      {text && <p className="text-[15px] text-gray-500 font-medium tracking-tight">{text}</p>}
    </div>
  );

  if (overlay) {
    return <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">{spinner}</div>;
  }

  return <div className="flex items-center justify-center py-8">{spinner}</div>;
};
