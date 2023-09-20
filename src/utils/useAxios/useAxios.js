import axios, { isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

const useAxios = ({ axiosParams, autoRun = true }) => {
	const [response, setResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState({ isError: false, type: "", message: "" });

	const axiosInstance = axios.create({
		baseURL: "http://localhost:3000/api",
		timeout: 10000,
	});

	const fetchData = useCallback(
		async params => {
			try {
				const { data } = await axiosInstance.request({ ...params });

				setResponse(data);
			} catch (err) {
				if (isAxiosError(err)) {
					setError({
						isError: true,
						type: err.name,
						message: err.message,
					});
				}
			} finally {
				setIsLoading(false);
			}
		},
		[axiosInstance],
	);

	const resetData = () => {
		setResponse(null);
		setError({ isError: false, type: "", message: "" });
	};

	useEffect(() => {
		const runEffect = async () => {
			if (autoRun) {
				await fetchData(axiosParams);
			}
		};

		runEffect();
	}, [autoRun, axiosParams, fetchData]);

	return { response, error, isLoading, fetchData, resetData };
};

export default useAxios;
