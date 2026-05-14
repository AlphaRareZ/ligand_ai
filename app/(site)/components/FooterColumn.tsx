export default  function FooterColumn({ title, items }:{title:string,items:{label:string, link:string}[]}) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4 uppercase">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => {
          return (
            <li key={index} className="font-medium">
              <a href={item.link} className="hover:text-blue-500">
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
