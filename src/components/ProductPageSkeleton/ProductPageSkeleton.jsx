import styles from "./ProductPageSkeleton.module.css";

export default function ProductPageSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.imageSkeleton} />

        <div className={styles.info}>
          <div className={styles.title} />
          <div className={styles.price} />
          <div className={styles.text} />
          <div className={styles.text} />
          <div className={styles.button} />
        </div>
      </div>
    </div>
  );
}
