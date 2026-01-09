# this file will contain the code for handling database operations
import psycopg2


class DBService:
    def __init__(self, db_config):
        self.connection = psycopg2.connect(**db_config)
        self.cursor = self.connection.cursor()

    def execute_query(self, query, params=None, all=True):
        try:
            self.cursor.execute(query, params)
            self.connection.commit()
            if all:
                return self.cursor.fetchall()
            return self.cursor.fetchone()
        except Exception as e:
            raise Exception(f"The following exception got raised {e}")

    def insert_values(self, query, params=None):
        try:
            self.cursor.execute(query, params)
            self.connection.commit()
        except Exception as e:
            raise Exception(f"The following exception got raised {e}")

    def __close(self):
        self.cursor.close()
        self.connection.close()

    def __del__(self):
        self.__close()
