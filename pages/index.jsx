import Head from "next/head";
import styles from "../styles/Home.module.css";
import Login from "../components/login/login";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <>
          <Login />
        </>
      </main>

      <footer></footer>
    </div>
  );
}
