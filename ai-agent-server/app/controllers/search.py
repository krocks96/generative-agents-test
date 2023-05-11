from infrastructures.elasticsearch import ElasticsearchRepository

class SearchUseCase:
    def __init__(self, repo: ElasticsearchRepository) -> None:
        self.repository = repo

    def search(self):
        es = self.repository.get_client()
        res = es.search(index="my_index", body={"query": {"match_all": {}}})
        return res