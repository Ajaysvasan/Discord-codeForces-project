const Server = (serverComponents:any)=>{

    console.log((serverComponents[0]))

    return(
        <nav id="server-container">
            <h1>Hello world</h1>
            {
                serverComponents.map((comp:any)=>(
                    <div className="components" key={comp}>
                        <button>{comp}</button>
                    </div>
                ))
            }
        </nav>
    )
}

export default Server;