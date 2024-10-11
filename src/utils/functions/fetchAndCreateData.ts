interface FetchAndCreateDataOptions {
  dataDetail: any[];
  cb: (data: any) => Promise<void>;
  section: string;
  setDataProcessing: (section: string) => void;
  setDataLength: (lengthData: number) => void;
  setProgress: (processedData: number) => void;
  batchSize?: number;
}

export const fetchAndCreateData = async ({
  dataDetail,
  cb,
  section,
  setDataProcessing,
  setDataLength,
  setProgress,
  batchSize = 10000,
}: FetchAndCreateDataOptions) => {
  setDataProcessing(section);
  setDataLength(dataDetail.length);

  for (let i = 0; i < dataDetail.length; i += batchSize) {
    const batch = dataDetail.slice(i, i + batchSize);

    try {
      await Promise.all(
        batch.map(async (data) => {
          await cb(data);
          setProgress(i + batch.indexOf(data) + 1);
        })
      );
    } catch (error) {
      console.error("Error processing batch:", error);
      throw error; // Rethrow the error to be caught in the main error handling block
    }
  }
};
