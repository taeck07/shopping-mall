export interface InfinityQueryType<T> {
	currentPage: number;
	totalCount: number;
	result: T[];
}
