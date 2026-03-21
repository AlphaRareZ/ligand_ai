export default  function StatCard({title, value, color, subtitle} :{title:string, value:string, color:string, subtitle:string}) {
    return (
        <div className="flex flex-col gap-2 items-center">
            <h3 className="text-[#94a3b3]">{title}</h3>
            <p className="font-extrabold text-4xl">
                {value}{" "}
                <span className={`text-lg font-semibold ${color}`}>
          {subtitle}
        </span>
            </p>
        </div>
    );
}