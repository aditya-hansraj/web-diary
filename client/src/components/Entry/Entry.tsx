import moment from "moment";
import { useTheme } from "../..//contexts/theme.context";
import { Link } from "react-router-dom";
import Tag from "./Tag";

const Entry = (props: { title: string; date: string; tags: string[] }) => {
  const date = moment(props.date).calendar();
  const { darkMode } = useTheme();
  return (
    <div
      className={`entry rounded d-flex justify-content-between m-3 px-4 py-3 ${darkMode ? "bg-dark" : "bg-light"}`}
    >
      <div className="left">
        <Link to="#" className="text-decoration-none">
          <h3
            className={`entry-title ${darkMode ? "text-light" : "text-dark"} `}
          >
            {props.title}
          </h3>
        </Link>
        <div className="tags mt-4">
          {props.tags.map((tag, index) => {
            return (
              <Tag key={index} tag={tag} delete={false} />
            );
          })}
        </div>
      </div>
      <div className="right">
        <p className="entry-date">{date}</p>
      </div>
    </div>
  );
};

export default Entry;
