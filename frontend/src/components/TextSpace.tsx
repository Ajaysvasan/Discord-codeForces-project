interface TextInfo{
  selectedChannel:string
}
const TextSpace = ({selectedChannel}:TextInfo)=>{
  return(
    <div className="text-space">
      <h1>text space</h1>
      {selectedChannel}
    </div>
  );
}

export default TextSpace;
