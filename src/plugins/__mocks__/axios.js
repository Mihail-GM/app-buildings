const mockAxios = jest.genMockFromModule('axios')

mockAxios.create = jest.fn(() => mockAxios)
mockAxios.put = jest.fn(() => Promise.resolve({data: {}}))
mockAxios.post = jest.fn(() => Promise.resolve({data: {}}))
mockAxios.get = jest.fn( () => Promise.resolve({data: {}}))

export default mockAxios