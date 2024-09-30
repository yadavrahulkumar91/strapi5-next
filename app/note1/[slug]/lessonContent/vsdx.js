const VSDXViewer = ({ url }) => {
  const visioUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${url}`;
  return (
    <iframe
      src={visioUrl}
      width="100%"
      height="600px"
      frameBorder="0"
      title="VSDX Viewer"
    />
  );
};

export default VSDXViewer;
