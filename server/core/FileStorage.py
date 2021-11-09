class FileStorage:
    def create_file(self, file_name, data):
        file_path = 'data/' + file_name
        with open(file_path, "x") as f:
            f.write(data)
