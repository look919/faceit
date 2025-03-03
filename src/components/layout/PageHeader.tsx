interface PageHeaderProps {
  name: string;
}

export const PageHeader = (props: PageHeaderProps) => {
  return <h2 className="text-2xl font-bold mt-3 mb-2">{props.name}</h2>;
};
