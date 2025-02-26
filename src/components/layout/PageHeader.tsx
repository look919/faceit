interface PageHeaderProps {
  name: string;
}

export const PageHeader = (props: PageHeaderProps) => {
  return <h2 className="text-2xl font-bold">{props.name}</h2>;
};
