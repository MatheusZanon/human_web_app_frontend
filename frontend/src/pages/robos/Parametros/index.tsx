import { useRoboParametrosById } from "@/api";

function Parametros({ id }: { id: string }) {
  const { data: roboParametros, isLoading, isSuccess, isError, failureReason } = useRoboParametrosById({
    roboId: id
  });

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {
        isSuccess && <form>
          {roboParametros?.map((parametro) => (
            <div key={parametro.id}>
              <label className="form-label">{parametro.parametro_info.nome}</label>
              <input type="text" defaultValue={parametro.valor} className="form-control" />
            </div>
          ))}
          <button className="btn btn-primary">Executar</button>
        </form>
      }
      {isError && <div>Error <pre>{JSON.stringify(failureReason, null, 2)}</pre></div>}
    </>
  )
}

export default Parametros