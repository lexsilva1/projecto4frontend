import Header from "./HomeHeader";
import Panels from "./Panels";
import TaskCreator from "./TaskCreator";

const Home = () => {
    return (
        <div>
            <Header />
            <TaskCreator />
            <main>
                <Panels />
            </main>
            </div>
    );
}

export default Home;