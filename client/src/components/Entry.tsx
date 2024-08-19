import moment from "moment";

const Entry = (props: { title: string; date: string }) => {
  const date = moment(props.date).calendar();
  return (
    <div className="entry border border-1 rounded d-flex justify-content-between m-3 px-4 py-3">
      <h3 className="entry-title">{props.title}</h3>
      <p className="entry-date">{date}</p>
    </div>
  );
};

export default Entry;
