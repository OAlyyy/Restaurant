
export const TabItem = ({ title, index, active, setActive}) => {
    
     const className = active ? 'border-b-yellow-400' : 'border-none text-slate-400';

  


    return (
        
        <div className="w-full p-4 m-2 rounded text-white bg-gradient-to-b from-slate-600 to-transparent text-center">
        <button onClick={() => setActive(title)} className="pt-7 pb-3">
            <span className={`hover:text-yellow transition-colors border-b-2 ${className}`}>
            
            <h2>{title ? title : ''}</h2>

            </span>
            </button>
        </div>
       
    )
}
  // {title ? title.toUpperCase() : ''}
  // <div className="w-full p-4 m-2 rounded text-white bg-gradient-to-b from-slate-600 to-transparent text-center">